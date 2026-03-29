using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class TaskItemManager : ITaskItemService
    {
        ITaskDal _taskItemDal;

        //SuccessResult / ErrorResult => void
        //SuccessDataResult / ErrorDataResult => data

        public TaskItemManager(ITaskDal taskItemService)
        {
            _taskItemDal = taskItemService;
        }

        public IResult Add(TaskItem item)
        {

            if (item.Title.Length<2)
            {
                return new ErrorResult(Messages.TaskTitleInvalid);
            }
            _taskItemDal.Create(item);

            return new SuccessResult(Messages.TaskAdded);
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
            throw new NotImplementedException();
        }
    }
}
