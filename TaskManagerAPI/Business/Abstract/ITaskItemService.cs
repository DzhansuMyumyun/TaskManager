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
        IDataResult<List<TaskItemUpdateDto>> GetTasksWithDetails(int? projectId = null); 
        IDataResult<TaskItem> Add(TaskItemCreateDto dto);
        IResult Update(TaskItemUpdateDto dto);
        IResult Delete(int taskId);

    }
}
