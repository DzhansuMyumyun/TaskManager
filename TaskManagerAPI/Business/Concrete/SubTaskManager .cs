using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Entities.DTOs.SubtaskDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class SubTaskManager : ISubTaskService
    {
        private readonly ISubTaskDal _subTaskDal;

        public SubTaskManager(ISubTaskDal subTaskDal)
        {
            _subTaskDal = subTaskDal;
        }

        public IDataResult<List<SubTask>> GetAll()
        {
            return new SuccessDataResult<List<SubTask>>(_subTaskDal.GetAll(), Messages.ListedSubTasks);
        }

        public IDataResult<SubTask> GetById(int id)
        {
            return new SuccessDataResult<SubTask>(_subTaskDal.Get(s => s.Id == id));
        }

        public IDataResult<List<SubTask>> GetAllByTaskId(int taskId)
        {
            return new SuccessDataResult<List<SubTask>>( _subTaskDal.GetAll(s => s.TaskItemId == taskId));
        }
        public IResult Add(SubTaskCreateDto dto)
        {
            var subTask = new SubTask
            {
                Title = dto.Title,
                IsCompleted = dto.IsCompleted,
                TaskItemId = dto.TaskItemId

            };
            _subTaskDal.Create(subTask);
            return new SuccessResult(Messages.SubTaskAdded);

        }

        public IResult Update(SubTaskUpdateDto dto)
        {
            var subTask = _subTaskDal.Get(s => s.Id == dto.Id);
            if (subTask == null) return new ErrorResult(Messages.SubTaskNotFound);

            subTask.Title = dto.Title;
            subTask.IsCompleted = dto.IsCompleted;


            _subTaskDal.Update(subTask);
            return new SuccessResult(Messages.SubTaskUpdated);
        }

        public IResult Delete(int subTaskId)
        {
            _subTaskDal.Delete(new SubTask { Id = subTaskId });
            return new SuccessResult(Messages.SubTaskDeleted);
        }

    }
}
