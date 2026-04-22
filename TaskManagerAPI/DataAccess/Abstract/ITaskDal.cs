using Core.DataAccess;
using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface ITaskDal : IEntityRepository<TaskItem>
    {
        List<TaskItem> GetTasksWithDetails(Expression<Func<TaskItem, bool>> filter);

    }
}
