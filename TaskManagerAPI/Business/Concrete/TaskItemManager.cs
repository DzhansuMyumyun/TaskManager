using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Constants;
using Core.CrossCuttingConcerns.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using FluentValidation;
using Microsoft.Extensions.Validation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class TaskItemManager : ITaskItemService
    {

        //SuccessResult / ErrorResult => void
        //SuccessDataResult / ErrorDataResult => data


        ITaskDal _taskItemDal;

        public TaskItemManager(ITaskDal taskItemService)
        {
            _taskItemDal = taskItemService;
        }

        [ValidationAspect(typeof(TaskItemValidator))]
        public IResult Add(TaskItem item)
        {

            _taskItemDal.Create(item);

            return new SuccessResult(Messages.TaskAdded);
        }

        public IResult Delete(int itemId)
        {
            var taskToDelete = new TaskItem { Id = itemId };

            _taskItemDal.Delete(taskToDelete);
            return new SuccessResult(Messages.TaskDeleted);
        }

        public IDataResult<List<TaskItem>> GetAll()
        {
            return new SuccessDataResult<List<TaskItem>>(_taskItemDal.GetAll(), Messages.ListedTasks);
        }

        public IDataResult<TaskItem> GetById(int taskId)
        {
            return new SuccessDataResult<TaskItem>(_taskItemDal.Get(t => t.Id == taskId));
        }

        public IDataResult<List<TaskItem>> GetByStatusId(int id)
        {
            return new SuccessDataResult<List<TaskItem>>(
                    _taskItemDal.GetAll(t => (int)t.Status == id),
                    Messages.ListedTasks);  
        }

        public IResult Update(TaskItem item)
        {
            if (item.Title.Length < 2)
            {
                return new ErrorResult(Messages.TaskTitleInvalid);
            }

            _taskItemDal.Update(item);
            return new SuccessResult(Messages.TaskUpdated);
        }
    }
}
