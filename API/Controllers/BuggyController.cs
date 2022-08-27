using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        { 
            return NotFound();
        }
           [HttpGet("bad-requests")]
        public ActionResult GetBadRequest()
        { 
            return BadRequest(new ProblemDetails{Title="This is a bad request"});
        }
           [HttpGet("unauthorised")]
        public ActionResult GetUnAuthorised()
        { 
            return Unauthorized();
        }
           [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        { 
            ModelState.AddModelError("HataKodu1","this is first error");
            ModelState.AddModelError("HataKodu2","this is second error");
            return ValidationProblem();
        }
           [HttpGet("server-error")]
        public ActionResult GetServerError()
        { 
            throw new Exception("This is a server error");
        }
    }
}