using Business.Abstract;
using Entities.DTOs.TaskDTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class TaskItemsController : ControllerBase
{
    private readonly ITaskItemService _taskItemService;

    public TaskItemsController(ITaskItemService taskItemService)
    {
        _taskItemService = taskItemService;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_taskItemService.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok(_taskItemService.GetById(id));

    [HttpGet("status/{id}")]
    public IActionResult GetByStatus(int id) => Ok(_taskItemService.GetByStatusId(id));

    [HttpPost]
    public IActionResult Add([FromBody] TaskItemCreateDto dto) => Ok(_taskItemService.Add(dto));

    [HttpPut]
    public IActionResult Update([FromBody] TaskItemUpdateDto dto) => Ok(_taskItemService.Update(dto));

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) => Ok(_taskItemService.Delete(id));
}