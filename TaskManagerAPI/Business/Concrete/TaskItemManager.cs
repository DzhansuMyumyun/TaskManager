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

        public IResult Add(TaskItemCreateDto dto)
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
            return new SuccessResult(Messages.TaskAdded);
        }

        public IResult Update(TaskItemUpdateDto dto)
        {
            var task = _taskItemDal.Get(t => t.Id == dto.Id);
            if (task == null) return new ErrorResult(Messages.TaskNotFound);

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Status = dto.Status;
            task.Priority = dto.Priority;
            task.DueDate = dto.DueDate;

            _taskItemDal.Update(task);

            var oldTask = _taskItemDal.Get(t => t.Id == dto.Id);
            if (oldTask.Status != dto.Status)
            {
                LogActivity(task.Id, $"Status changed from {oldTask.Status} → {dto.Status}");
            }

            return new SuccessResult(Messages.TaskUpdated);
        }

        public IResult Delete(int taskId)
        {
            var task = _taskItemDal.Get(t => t.Id == taskId);
            if (task == null)
                return new ErrorResult(Messages.TaskNotFound);

            _taskItemDal.Delete(task);
            LogActivity(task.Id, $"Task '{task.Title}' deleted");
            return new SuccessResult(Messages.TaskDeleted);
        }


        private void LogActivity(int taskId, string message)
        {
            _taskActivityService.Add(new TaskActivityCreateDto
            {
                TaskItemId = taskId,
                UserId = 1,
                LogDetails = message
            });
        }
    }
}
