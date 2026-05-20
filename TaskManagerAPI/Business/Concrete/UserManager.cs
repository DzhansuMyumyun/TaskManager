using Business.Abstract;
using Core.Constants;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Abstract;
using Entities.Concrete;
using Entities.DTOs.UserDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        IUserDal _userDal;
        
        public UserManager(IUserDal user)
        {
            _userDal = user;
        }
        public IResult Add(User user)
        {
            _userDal.Create(user);
            return new SuccessResult(Messages.ProjectAdded);
        }

        public IResult Delete(int userId)
        {
            _userDal.Delete(new User { Id = userId });
            return new SuccessResult(Messages.UserDeleted);
        }

        public IDataResult<List<User>> GetAll()
        {

            return new SuccessDataResult<List<User>>(_userDal.GetAll(),Messages.ListedUsers);
        }

        public IDataResult<User> GetByMail(string email)
        {
            var user = _userDal.Get(u => u.Email == email);
            if (user == null)
            {
                return new ErrorDataResult<User>("User not found");
            }
            return new SuccessDataResult<User>(user);
        }

        public IDataResult<List<OperationClaim>> GetClaims(User user)
        {
            var claims = _userDal.GetClaims(user);
            return new SuccessDataResult<List<OperationClaim>>(claims);
        }

        public IResult Update(User dto)
        {
            throw new NotImplementedException();
        }
    }
}
