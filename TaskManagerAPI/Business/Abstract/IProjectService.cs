using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using Entities.DTOs.ProjectDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IProjectService
    {
        IDataResult<List<Project>> GetAll();
        IDataResult<Project> GetById(int id);
        IResult Add(ProjectCreateDto dto);
        IResult Update(ProjectUpdateDto dto);
        IResult Delete(int projectId);
    }
}
