using Microsoft.EntityFrameworkCore;
using EMGVoitures.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace EMGVoitures.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<CarModel> CarModels { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // Important pour Identity

            // Configurez les colonnes pour utiliser les types SQLite
            builder.Entity<IdentityUser>(entity =>
            {
                entity.Property(e => e.Id).HasColumnType("TEXT");
                entity.Property(e => e.UserName).HasColumnType("TEXT");
                entity.Property(e => e.NormalizedUserName).HasColumnType("TEXT");
                entity.Property(e => e.Email).HasColumnType("TEXT");
                // etc.
            });

            // Autres configurations...

            builder.Entity<Vehicle>()
                .Property(v => v.Brand)
                .IsRequired();
                
            builder.Entity<Vehicle>()
                .Property(v => v.Price)
                .HasColumnType("decimal(18,2)");

            builder.Entity<Vehicle>()
                .HasOne(v => v.Model)
                .WithMany()
                .HasForeignKey(v => v.ModelId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CarModel>()
                .Property(m => m.Name)
                .IsRequired();
        }
    }
}