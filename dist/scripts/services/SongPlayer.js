 
(function() {
    
         angular
         .module('blocJams')
//         .factory('SongPlayer', [SongPlayer]);
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
//     new SongPlayer(sadfasdf, new Fixtures())
    
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

         
 /**
 * @desc Retrives album info
 * @type {Object}
 */
          var currentAlbum = Fixtures.getAlbum();
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }
              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
                  });
              
              currentBuzzObject.bind('timeupdate', function() {
                  $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
     });

 
        SongPlayer.currentSong = song;
 /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
        SongPlayer.currentTime = null;
         };
 
/**
 * @function playSong
 * @desc Private reusable function that plays a song
 * @param {Object} song
 */
         var playSong = function(song){
                 currentBuzzObject.play();
                 song.playing = true;
         };
/**
 * @function stopSong
 * @desc Private reusable function that stops a song
 * @param {Object} song
 */
        var stopSong = function(song){
                 currentBuzzObject.stop();
                 song.playing = null;
         };
/**
/**
*@function getSongIndex
*@desc Private function that returns the index of songs in the currently presented album
*/
     var getSongIndex = function(song) {
         return currentAlbum.songs.indexOf(song);
     };
/**
*@desc Current song default
*@type {Object}
*/
         SongPlayer.currentSong = null;

         SongPlayer.volume = null;
/**
/volume bar
*/
         SongPlayer.setVolume = function(volume){
             if (currentBuzzObject){
                currentBuzzObject.setVolume(volume);
             }
         };
         
         
/**
 * @function SongPlayer.play
 * @desc Causes song to play
 * @param {Object} song
 */
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
           
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                      playSong(song);
             }
         }
    };
/**
 * @function SongPlayer.pause
 * @desc Causes song to pause
 * @param {Object} song
 */
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };
 /**
 * @function SongPlayer.previous
 * @desc Decreases song number when clicked
 * @param {Object} empty
 */ 
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;
              
                   if (currentSongIndex < 0) {
                       stopSong(SongPlayer.currentSong);
                    } else {
                        var song = currentAlbum.songs[currentSongIndex];
                        setSong(song);
                        playSong(song);
              }
          };
         
         SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;
              
                   if (currentSongIndex > currentAlbum.songs.length-1) {
                       stopSong(SongPlayer.currentSong);
                    } else {
                        var song = currentAlbum.songs[currentSongIndex];
                        setSong(song);
                        playSong(song);
              }
          };
 /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
        SongPlayer.setCurrentTime = function(time) {
           if (currentBuzzObject) {
           currentBuzzObject.setTime(time);
           }
       };
         
          return SongPlayer;
}
     
     

 })();

/**
/**
 var currentAlbum = Fixtures.getAlbum();
 .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
*/