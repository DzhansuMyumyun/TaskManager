using Core.Entities.Concrete;
using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs.TaskDTOs;
using Entities.DTOs.UserDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IUserService
    {


        IDataResult<List<User>> GetAll();
        IDataResult<List<OperationClaim>> GetClaims(User user);
        IDataResult<User> GetByMail(string email);
        IResult Add(User user);
        IResult Update(User dto);
        IResult Delete(int userId);

    }
    }

