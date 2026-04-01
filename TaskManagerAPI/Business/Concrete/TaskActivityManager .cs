using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class TaskActivityManager : ITaskActivityService
    {
        private  ITaskActivityDal _taskActivityDal;

        public TaskActivityManager(ITaskActivityDal taskActivityDal)
        {
            _taskActivityDal = taskActivityDal;
        }

        public IDataResult<List<TaskActivity>> GetAll()
        {
            return new SuccessDataResult<List<TaskActivity>>(_taskActivityDal.GetAll(), Messages.ListedActivities);
        }

        public IDataResult<TaskActivity> GetById(int id)
        {
            return new SuccessDataResult<TaskActivity>(_taskActivityDal.Get(a => a.Id == id));
        }

        public IResult Add(TaskActivityCreateDto dto)
        {
            var activity = new TaskActivity
            {
                TaskItemId = dto.TaskItemId,
                UserId = dto.UserId,
                LogDetails = dto.LogDetails
            };

            _taskActivityDal.Create(activity);
            return new SuccessResult(Messages.ActivityAdded);
        }
    }
}
