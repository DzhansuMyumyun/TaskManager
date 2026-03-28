using Business.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class TaskItemManager : ITaskItemService
    {
        ITaskItemService _taskItemDal;

        public TaskItemManager(ITaskItemService taskItemService)
        {
            _taskItemDal = taskItemService;
        }

        public List<TaskItem> GetAll()
        {
            return _taskItemDal.GetAll();
        }
    }
}
