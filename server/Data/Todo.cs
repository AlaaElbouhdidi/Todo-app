using System.ComponentModel.DataAnnotations;

namespace server.Data
{
    internal sealed class Todo
    {
        [Key]
        public string TodoId { get; set; } = string.Empty;
        [Required]
        [MaxLength(250)]
        public String Title { get; set; } = string.Empty;
        [Required]
        public Boolean isDone { get; set; } = false;
        public String? DueDate { get; set; } = string.Empty;

    }
}
