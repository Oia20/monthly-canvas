using System.ComponentModel.DataAnnotations.Schema;



namespace canvasAPI.models;

[Table("paintings")]
public class Artworks
{
    public int id {get; set;}
    public string? artist { get; set; }
    public string? title { get; set; }
    public string? image { get; set; }
}