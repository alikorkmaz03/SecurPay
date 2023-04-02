FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app


#copy  cspproj and restore as distinct layers

COPY *.csproj ./
RUN dotnet restore

# copy everthing else and build app
COPY  . ./
RUN dotnet publish -c Release -o out

#build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet","API.dll"]