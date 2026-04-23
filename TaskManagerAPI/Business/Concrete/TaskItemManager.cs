using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Constants;
using Core.CrossCuttingConcerns.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Entities.DTOs;
using Entities.DTOs.SubtaskDTOs;
using Entities.DTOs.TaskDTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Business.Concrete
{
    public class TaskItemManager : ITaskItemService
    {
        private  ITaskDal _taskItemDal;
        private ITaskActivityService _taskActivityService;

        public TaskItemManager(ITaskDal taskItemDal, ITaskActivityService taskActivityDal)
        {
            _taskItemDal = taskItemDal;
            _taskActivityService = taskActivityDal;
        }

        public IDataResult<List<TaskItem>> GetAll()
        {
            return new SuccessDataResult<List<TaskItem>>(_taskItemDal.GetAll(), Messages.ListedTasks);
        }

        public IDataResult<TaskItem> GetById(int id)
        {
            return new SuccessDataResult<TaskItem>(_taskItemDal.Get(t => t.Id == id));
        }

        public IDataResult<List<TaskItem>> GetByStatusId(int id)
        {
            return new SuccessDataResult<List<TaskItem>>(_taskItemDal.GetAll(t => (int)t.Status == id));
        }

        public IDataResult<List<TaskItemUpdateDto>> GetTasksWithDetails(int? projectId)
        {
            var tasks = _taskItemDal.GetTasksWithDetails(t => !projectId.HasValue || t.ProjectId == projectId);

            var mappedTasks = tasks.Select(t => new TaskItemUpdateDto
            {
                Id = t.Id,
                Title = t.Title,
                Status = t.Status,
                Description = t.Description,
                Priority = t.Priority,
                SubTasks = t.SubTasks.Select(s => new SubTaskUpdateDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    IsCompleted = s.IsCompleted
                }).ToList()
            }).ToList();

            return new SuccessDataResult<List<TaskItemUpdateDto>>(mappedTasks);
        }

        public IDataResult<TaskItem> Add(TaskItemCreateDto dto)
        {
            var task = new TaskItem
            {
                ProjectId = dto.ProjectId,
                Title = dto.Title,
                Description = dto.Description,
                Status = dto.Status,
                Priority = dto.Priority,
                DueDate = dto.DueDate
            };

            _taskItemDal.Create(task);

            LogActivity(task.Id, $"Task '{task.Title}' created");
            Console.WriteLine($"CREATED TASK ID: {task.Id}");

            return new SuccessDataResult<TaskItem>(
                task,
                Messages.TaskAdded
            );
        }

        public IResult Update(TaskItemUpdateDto dto)
        {
            var task = _taskItemDal.Get(t => t.Id == dto.Id);
            if (task == null) return new ErrorResult(Messages.TaskNotFound);
            var oldStatus = task.Status;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Status = dto.Status;
            task.Priority = dto.Priority;
            task.DueDate = dto.DueDate;

            _taskItemDal.Update(task);

            if (oldStatus != dto.Status)
            {
                LogActivity(task.Id, $"Status changed from {oldStatus} → {dto.Status}");
            }

            return new SuccessResult(Messages.TaskUpdated);
        }

        public IResult Delete(int taskId)
        {
            var task = _taskItemDal.Get(t => t.Id == taskId);
            if (task == null)
                return new ErrorResult(Messages.TaskNotFound);

            LogActivity(0, $"Task '{task.Title}' deleted");
            _taskItemDal.Delete(task);

            return new SuccessResult(Messages.TaskDeleted);
        }


        private void LogActivity(int taskId, string message)
        {
            _taskActivityService.Add(new TaskActivityCreateDto
            {
                TaskItemId = taskId == 0 ? null : taskId,
                UserId = 1,
                LogDetails = message
            });
        }
    }
}
