using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs.AttachmentDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class AttachmentManager : IAttachmentService
    {
        private  IAttachmentDal _attachmentDal;

        public AttachmentManager(IAttachmentDal attachmentDal)
        {
            _attachmentDal = attachmentDal;
        }

        public IDataResult<List<Attachment>> GetAll()
        {
            return new SuccessDataResult<List<Attachment>>(_attachmentDal.GetAll(), Messages.ListedAttachments);
        }

        public IDataResult<Attachment> GetById(int id)
        {
            return new SuccessDataResult<Attachment>(_attachmentDal.Get(a => a.Id == id));
        }

        public IResult Add(AttachmentCreateDto dto)
        {
            var attachment = new Attachment
            {
                TaskItemId = dto.TaskItemId,
                FileName = dto.FileName,
                FilePath = dto.FilePath,
                FileType = dto.FileType
            };

            _attachmentDal.Create(attachment);
            return new SuccessResult(Messages.AttachmentAdded);
        }

        public IResult Delete(int attachmentId)
        {
            _attachmentDal.Delete(new Attachment { Id = attachmentId });
            return new SuccessResult(Messages.AttachmentDeleted);
        }
    }
}
