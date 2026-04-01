using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs.SubtaskDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ISubTaskService
    {
        IDataResult<List<SubTask>> GetAll();
        IDataResult<SubTask> GetById(int id);
        IResult Add(SubTaskCreateDto dto);
        IResult Update(SubTaskUpdateDto dto);
        IResult Delete(int subTaskId);
    }
}
