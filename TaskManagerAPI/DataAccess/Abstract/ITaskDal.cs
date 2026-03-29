using System;
using Entities.Concrete;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;

namespace DataAccess.Abstract
{
    public interface ITaskDal : IEntityRepository<TaskItem>
    {

    }
}
