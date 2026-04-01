using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs.TaskDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ITaskItemService
    {
        IDataResult<List<TaskItem>> GetAll();
        IDataResult<TaskItem> GetById(int id);
        IDataResult<List<TaskItem>> GetByStatusId(int id);
        IResult Add(TaskItemCreateDto dto);
        IResult Update(TaskItemUpdateDto dto);
        IResult Delete(int taskId);

    }
}
