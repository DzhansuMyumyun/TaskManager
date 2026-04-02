using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using Entities.DTOs.ProjectDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IProjectActivityService 
    {
        IDataResult<List<ProjectActivityDto>> GetAllByProjectId(int projectId);
        IResult Add(ProjectActivityCreateDto dto);
    }
}
