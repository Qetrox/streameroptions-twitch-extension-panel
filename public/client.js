const homeBtn = document.getElementById('home-btn');
const pointsBtn = document.getElementById('points-btn');
const watchtimeBtn = document.getElementById('watchtime-btn');
const home = document.querySelector('.home');
const topPoints = document.querySelector('.top-points');
const topWatchtime = document.querySelector('.top-watchtime');

a = false;
b = false;
let streamerName;

document.addEventListener('DOMContentLoaded', function () {
    Twitch.ext.onAuthorized(function (auth) {
    const streamerId = auth.channelId;

        homeBtn.addEventListener('click', () => {
            home.style.display = 'flex';
            topPoints.style.display = 'none';
            topWatchtime.style.display = 'none';
            homeBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 1)';
            pointsBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 0)';
            watchtimeBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 0)';
        });
        pointsBtn.addEventListener('click', () => {
            home.style.display = 'none';
            topPoints.style.display = 'block';
            topWatchtime.style.display = 'none';
            homeBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 0)';
            pointsBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 1)';
            watchtimeBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 0)';

            if (!a) {
                const request2 = new XMLHttpRequest();
                request2.open('GET', `https://streameroptions.com/api/v1/twitch/point-leaderboard?u=` + streamerId);
                request2.send();
                request2.onload = () => {
                    if (request.status === 200) {
                        const data = JSON.parse(request2.response);
                        if (data.length > 0) {
                            let j = 1;
                            data.forEach(person => {
                                const tr = document.createElement('tr');
                                const rank = document.createElement('td');
                                rank.innerText = j;
                                const username = document.createElement('td');
                                username.innerText = person.username;
                                const points = document.createElement('td');
                                points.innerText = person.points;
                                tr.appendChild(rank);
                                tr.appendChild(username);
                                tr.appendChild(points);
                                topPoints.querySelector('tbody').appendChild(tr);
                                j++;
                            });
                        }
                    }
                }
                a = true;
            }

        });
        watchtimeBtn.addEventListener('click', () => {
            home.style.display = 'none';
            topPoints.style.display = 'none';
            topWatchtime.style.display = 'block';
            homeBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 0)';
            pointsBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 0)';
            watchtimeBtn.style.borderBottom = '2px solid rgba(255, 255, 255, 1)';

            if (!b) {
                const request3 = new XMLHttpRequest();
                request3.open('GET', `https://streameroptions.com/api/v1/twitch/watchtime-leaderboard?u=` + streamerId);
                request3.send();
                request3.onload = () => {
                    if (request.status === 200) {
                        const data = JSON.parse(request3.response);
                        if (data.length > 0) {
                            let j = 1;
                            data.forEach(person => {
                                const tr = document.createElement('tr');
                                const rank = document.createElement('td');
                                rank.innerText = j;
                                const username = document.createElement('td');
                                username.innerText = person.username;
                                const points = document.createElement('td');
                                points.innerText = person.watchtime;
                                tr.appendChild(rank);
                                tr.appendChild(username);
                                tr.appendChild(points);
                                topWatchtime.querySelector('tbody').appendChild(tr);
                                j++;
                            });
                        }
                    }
                }
                b = true;
            }
        });

        const request = new XMLHttpRequest();
        request.open('GET', `https://streameroptions.com/api/v1/twitch/activated-modules?u=` + streamerId);
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                if (data.length > 1) {

                    streamerName = data[0].href_name;

                    delete data[0]

                    data.forEach(module => {
                        const moduleDiv = document.createElement('a');
                        moduleDiv.target = '_blank';
                        moduleDiv.classList.add('module');
                        moduleDiv.href = 'https://streameroptions.com/' + streamerName;
                        const moduleName = document.createElement('h1');
                        moduleName.innerText = module.title;
                        if (module.image_url !== undefined) {
                            const moduleImg = document.createElement('img');
                            moduleImg.src = module.image_url;
                            moduleDiv.appendChild(moduleImg);
                        }
                        moduleDiv.appendChild(moduleName);
                        home.appendChild(moduleDiv);
                    });
                } else {
                    const moduleName = document.createElement('h1');
                    moduleName.innerText = 'No Modules Found For This Streamer';
                    home.appendChild(moduleName);
                    home.style.justifyContent = 'center';
                    home.style.alignItems = 'center';
                }
            }
        }

    });
})