using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfTaskItemDal : ITaskDal
    {
        List<TaskItem> _tasks;
        public void Create(TaskItem taskItem)
        {
            _tasks.Add(taskItem);
        }

        public void Delete(TaskItem taskItem)
        {
            TaskItem taskItemToDelete;

            taskItemToDelete = _tasks.SingleOrDefault(t => t.Id == taskItem.Id);

            _tasks.Remove(taskItemToDelete);

        }

        public List<TaskItem> GetAll()
        {
            return _tasks;
        }


        public void Update(TaskItem taskItem)
        {
            TaskItem taskToUpdate = _tasks.SingleOrDefault(t => t.Id == taskItem.Id);
            taskToUpdate.Title = taskItem.Title;
            taskToUpdate.Description = taskItem.Description;
            taskToUpdate.Status = taskItem.Status;
            taskToUpdate.DueDate = taskItem.DueDate;


        }
    }
}
