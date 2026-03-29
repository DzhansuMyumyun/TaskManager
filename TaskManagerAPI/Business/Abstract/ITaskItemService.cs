using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ITaskItemService
    {
        IDataResult<List<TaskItem>> GetAll();
        IDataResult<List<TaskItem>> GetByStatusId(int id);
        IDataResult<TaskItem> GetById(int id);
        IResult Add(TaskItem item);
        IResult Update(TaskItem item);
        IResult Delete(int itemId);

    }
}
