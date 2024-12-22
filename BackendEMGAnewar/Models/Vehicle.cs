namespace EMGVoitures.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public required string Brand { get; set; }
        public int ModelId { get; set; }  // Clé étrangère
        public CarModel Model { get; set; } // Propriété de navigation
        public int Year { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateSold { get; set; }
    }
}