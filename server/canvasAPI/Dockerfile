# Use the appropriate base image with the .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the .csproj file and restore dependencies
COPY canvasAPI.csproj .
RUN dotnet restore "canvasAPI.csproj"

# Copy the remaining source code and build the project
COPY . .
RUN dotnet publish "canvasAPI.csproj" -c Release -o /publish

# Build the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "canvasAPI.dll"]
