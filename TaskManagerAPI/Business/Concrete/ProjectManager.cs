using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ProjectManager : IProjectService
    {
        IProjectDal _projectDal;

        public ProjectManager(IProjectDal projectDal)
        {
            _projectDal = projectDal;

        }

        public IResult Add(Project project)
        {
            _projectDal.Create(project);
            return new SuccessResult(Messages.ProjectAdded);
        }

        public IResult Delete(int projectId)
        {
            var projectToDelete = new Project { Id = projectId };

            _projectDal.Delete(projectToDelete);
            return new SuccessResult(Messages.ProjectIsDeleted);
        }

        public IDataResult<List<Project>> GetAll()
        {
            return new SuccessDataResult<List<Project>>(_projectDal.GetAll(), Messages.ProjectsListed);
        }

        public IDataResult<Project> GetById(int id)
        {
            return new SuccessDataResult<Project>(_projectDal.Get(t => t.Id == id));
        }


        public IResult Update(Project project)
        {
            _projectDal.Update(project);
            return new SuccessResult(Messages.ProjectUpdated);
        }



        public IDataResult<Project> GetWithTasks(int projectId)
        {
            var project = _projectDal.Get(p => p.Id == projectId);
            return new SuccessDataResult<Project>(project);
        }


        public IDataResult<List<ProjectSummaryDto>> GetProjectSummaries()
        {
            var projects = _projectDal.GetAll();
            var summaries = projects.Select(p => new ProjectSummaryDto
            {
                Id = p.Id,
                Name = p.Name,
                ColorHex = p.ColorHex,
                TotalTasks = p.TaskItems.Count,
                CompletedTasks = p.TaskItems.Count(t => t.Status == TaskItem.TaskStatus.Done)
            }).ToList();

            return new SuccessDataResult<List<ProjectSummaryDto>>(summaries);
        }
    }
}
