using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Entities.DTOs;
using Entities.DTOs.ProjectDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ProjectManager : IProjectService
    {
        private IProjectDal _projectDal;

        public ProjectManager(IProjectDal projectDal )
        {
            _projectDal = projectDal;
    
        }

        public IDataResult<List<Project>> GetAll()
        {
            var projects = _projectDal.GetAll(includes: p => p.TaskItems);
       
            return new SuccessDataResult<List<Project>>(projects, Messages.ListedProjects);
        }

        public IDataResult<Project> GetById(int id)
        {
            return new SuccessDataResult<Project>(_projectDal.Get(p => p.Id == id));
        }

        public IResult Add(ProjectCreateDto dto)
        {
            var project = new Project
            {
                UserId = dto.UserId,
                Name = dto.Name,
                ColorHex = dto.ColorHex,
                Category = dto.Category
            };

            _projectDal.Create(project);
            return new SuccessResult(Messages.ProjectAdded);
        }

        public IResult Update(ProjectUpdateDto dto)
        {
            var project = _projectDal.Get(p => p.Id == dto.Id);
            if (project == null) return new ErrorResult(Messages.ProjectNotFound);

            project.Name = dto.Name;
            project.ColorHex = dto.ColorHex;
            project.Category = dto.Category;

            _projectDal.Update(project);
            return new SuccessResult(Messages.ProjectUpdated);
        }

        public IResult Delete(int projectId)
        {
            _projectDal.Delete(new Project { Id = projectId });
            return new SuccessResult(Messages.ProjectDeleted);
        }


    }
}
