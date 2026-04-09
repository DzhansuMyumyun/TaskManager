using Core.DataAccess.EntityFramework;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfTaskItemDal: EfEntityRepositoryBase<TaskItem,TaskManagerContext>, ITaskDal
    {

        public List<TaskItem> GetTasksWithDetails()
        {
            using (var context = new TaskManagerContext())
            {
                return context.TaskItems
                              .Include(t => t.SubTasks)
                              .ToList();
            }
        }
    }
}
