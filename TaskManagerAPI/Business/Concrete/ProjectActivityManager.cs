using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs.ProjectDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ProjectActivityManager : IProjectActivityService
    {
        private readonly IProjectActivityDal _dal;

        public ProjectActivityManager(IProjectActivityDal dal)
        {
            _dal = dal;
        }

        public IResult Add(ProjectActivityCreateDto dto)
        {
            var activity = new ProjectActivity
            {
                ProjectId = dto.ProjectId,
                UserId = dto.UserId,
                LogDetails = dto.LogDetails
            };

            _dal.Create(activity);
            return new SuccessResult("Project activity added");
        }

        public IDataResult<List<ProjectActivityDto>> GetAllByProjectId(int projectId)
        {
            var list = _dal.GetAll(p => p.ProjectId == projectId)
                           .Select(p => new ProjectActivityDto
                           {
                               Id = p.Id,
                               ProjectId = p.ProjectId,
                               LogDetails = p.LogDetails,
                               CreatedAt = p.CreatedAt
                           }).ToList();

            return new SuccessDataResult<List<ProjectActivityDto>>(list);
        }
    }
}
