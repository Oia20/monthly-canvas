using System.ComponentModel.DataAnnotations.Schema;



namespace canvasAPI.models;

[Table("comments")]
public class Comments
{
    public int id {get; set;}

    public string? comment { get; set; }
    public int? month { get; set; }
    
}