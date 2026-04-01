using Business.Abstract;
using Entities.DTOs.SubtaskDTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class SubTasksController : ControllerBase
{
    private readonly ISubTaskService _subTaskService;

    public SubTasksController(ISubTaskService subTaskService)
    {
        _subTaskService = subTaskService;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_subTaskService.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok(_subTaskService.GetById(id));

    [HttpPost]
    public IActionResult Add([FromBody] SubTaskCreateDto dto) => Ok(_subTaskService.Add(dto));

    [HttpPut]
    public IActionResult Update([FromBody] SubTaskUpdateDto dto) => Ok(_subTaskService.Update(dto));

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) => Ok(_subTaskService.Delete(id));
}