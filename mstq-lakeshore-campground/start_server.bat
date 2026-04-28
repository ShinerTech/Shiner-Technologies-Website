@echo off
echo ====================================================
echo Starting Manistique Lakeshore Campground Support Web Server
echo ====================================================
echo.
echo The website is now running! 
echo Open your web browser and go to: http://localhost:8000
echo.
echo To stop the server, press CTRL+C or close this window.
echo.
python -m http.server 8000
pause
