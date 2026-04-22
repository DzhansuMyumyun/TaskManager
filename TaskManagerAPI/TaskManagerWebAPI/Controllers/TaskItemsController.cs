using Business.Abstract;
using Entities.Concrete;
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
    public IActionResult GetAll(int? projectId) // Add the optional parameter here
    {

        var result = _taskItemService.GetTasksWithDetails(projectId);

        if (result.Success)
        {
            return Ok(result);
        }
        return BadRequest(result.Message);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok(_taskItemService.GetById(id));

    [HttpGet("status/{id}")]
    public IActionResult GetByStatus(int id) => Ok(_taskItemService.GetByStatusId(id));

    [HttpPost]
    public IActionResult Add([FromBody] TaskItemCreateDto dto)
    {
        var result = _taskItemService.Add(dto);

        if (!result.Success)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] TaskItemUpdateDto dto)
    {
        if (id != dto.Id)
        {
            return BadRequest("ID mismatch");
        }

        var result = _taskItemService.Update(dto);

        if (result.Success)
            return Ok(result);

        return BadRequest(result.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) => Ok(_taskItemService.Delete(id));
}