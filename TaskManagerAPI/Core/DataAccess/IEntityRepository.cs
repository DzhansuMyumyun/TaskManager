using Core.Entities;
using Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Core.DataAccess
{
    //Generic repository design pattern
    //Generic constraint (where T: class,IEntity,new())
    public interface IEntityRepository<T> where T: class,IEntity,new()
    {
        //CRUD
        void Create(T entity);
        List<T> GetAll(Expression<Func<T,bool>>? filter = null, params Expression<Func<T, object>>[] includes);
        T? Get(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] includes);
        void Update(T entity);
        void Delete(T entity);
    }
}
