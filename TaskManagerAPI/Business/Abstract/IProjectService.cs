using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IProjectService
    {
        IDataResult<List<Project>> GetAll();
        IDataResult<Project> GetById(int id);
        IResult Add(Project project);
        IResult Update(Project project);
        IResult Delete(int projectId);
        IDataResult<Project> GetWithTasks(int projectId);
        IDataResult<List<ProjectSummaryDto>> GetProjectSummaries();
    }
}
