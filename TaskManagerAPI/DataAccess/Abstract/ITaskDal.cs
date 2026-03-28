using System;
using Entities.Concrete;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Abstract
{
    public interface ITaskDal
    {
        //CRUD
        void Create(TaskItem taskItem);
        List<TaskItem> GetAll();
        void Update(TaskItem taskItem);
        void Delete(TaskItem taskItem);
    }
}
