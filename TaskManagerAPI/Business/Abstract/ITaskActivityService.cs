using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ITaskActivityService
    {
        IDataResult<List<TaskActivity>> GetAll();
        IDataResult<TaskActivity> GetById(int id);
        IResult Add(TaskActivityCreateDto dto);
    }
}
