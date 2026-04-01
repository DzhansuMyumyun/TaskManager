using Business.Abstract;
using Entities.DTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class TaskActivitiesController : ControllerBase
{
    private readonly ITaskActivityService _taskActivityService;

    public TaskActivitiesController(ITaskActivityService taskActivityService)
    {
        _taskActivityService = taskActivityService;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_taskActivityService.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok(_taskActivityService.GetById(id));

    [HttpPost]
    public IActionResult Add([FromBody] TaskActivityCreateDto dto) => Ok(_taskActivityService.Add(dto));
}