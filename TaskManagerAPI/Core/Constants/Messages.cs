using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Constants
{
    public static class Messages
    {
        public static string TaskAdded = "The task is added";
        public static string TaskTitleInvalid = "The task title requires a minimum length of two characters.";
        public static string ListedTasks = "The tasks are listed";
        public static string TaskUpdated = "The task is updated.";
        public static string TaskDeleted = "Selected task is deleted";
        public static string TaskTitleAlreadyExists = "The task title exists";

        public static string AuthorizationDenied = "Authorization is denied";

        public static string UserRegistered = "The user is registered";
        public static string UserNotFound = "The user is not found";
        public static string PasswordError = "Invalid password. Please try again.";
        public static string SuccessfulLogin = "You have successfully logged in.";
        public static string UserAlreadyExists = "This user exists";
        public static string AccessTokenCreated = "The access token is created";

        public static string ProjectAdded = "The project is added";

        public static string ProjectIsDeleted = "The project is deleted";

        public static string ProjectsListed = "The projects are listed";

        public static string ProjectUpdated = "The project is updated";

        public static string ProjectNotFound { get; set; }
        public static string ProjectDeleted { get; set; }
        public static string ListedProjects { get; set; }
        public static string SubTaskAdded { get; set; }
        public static string SubTaskNotFound { get; set; }
        public static string SubTaskUpdated { get; set; }
        public static string SubTaskDeleted { get; set; }
        public static string ListedSubTasks { get; set; }
        public static string ListedAttachments { get; set; }
        public static string AttachmentAdded { get; set; }
        public static string AttachmentDeleted { get; set; }
        public static string ListedActivities { get; set; }
        public static string ActivityAdded { get; set; }
        public static string TaskNotFound { get; set; }
    }
}
