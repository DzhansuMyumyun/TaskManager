using Business.Abstract;
using Entities.Concrete;
using Entities.DTOs.ProjectDTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _projectService.GetAll();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var result = _projectService.GetById(id);
        return Ok(result);
    }

    [HttpPost]
    public IActionResult Add([FromBody] ProjectCreateDto dto)
    {
        var result = _projectService.Add(dto);
        return Ok(result);
    }

    [HttpPut]
    public IActionResult Update([FromBody] ProjectUpdateDto dto)
    {
        var result = _projectService.Update(dto);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var result = _projectService.Delete(id);
        return Ok(result);
    }
}