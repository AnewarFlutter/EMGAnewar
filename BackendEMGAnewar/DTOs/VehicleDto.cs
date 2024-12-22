namespace EMGVoitures.DTOs
{
  public class VehicleDto
{
    public int Id { get; set; }
    public string? Brand { get; set; }
    public string? ModelName { get; set; }  // On affiche le nom du modèle
    public int ModelId { get; set; }       // On garde l'ID du modèle
    public int Year { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
    public string? ImageUrl { get; set; }
}

    public class CreateVehicleDto
    {
        public required string Brand { get; set; }
        public int ModelId { get; set; }
        public int Year { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public IFormFile? ImageFile { get; set; }
        public bool? IsAvailable { get; set; }
    }

    public class UpdateVehicleDto
    {
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? ImageUrl { get; set; }
        public bool? IsAvailable { get; set; }
    }
}