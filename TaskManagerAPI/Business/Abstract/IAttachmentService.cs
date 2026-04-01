using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs.AttachmentDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IAttachmentService
    {
        IDataResult<List<Attachment>> GetAll();
        IDataResult<Attachment> GetById(int id);
        IResult Add(AttachmentCreateDto dto);
        IResult Delete(int attachmentId);
    }
}
