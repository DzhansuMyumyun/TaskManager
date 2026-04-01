using Business.Abstract;
using Entities.DTOs.AttachmentDTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AttachmentsController : ControllerBase
{
    private readonly IAttachmentService _attachmentService;

    public AttachmentsController(IAttachmentService attachmentService)
    {
        _attachmentService = attachmentService;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_attachmentService.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok(_attachmentService.GetById(id));

    [HttpPost]
    public IActionResult Add([FromBody] AttachmentCreateDto dto) => Ok(_attachmentService.Add(dto));

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) => Ok(_attachmentService.Delete(id));
}