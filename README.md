# YoutubeClone

## Funcionalidades

1. *Vista Principal:*
   - En esta vista, se muestran todos los videos del canal.
   - Esta una imagen de banner.
   - Los videos se presentan en una lista con sus títulos y miniaturas.
   - Cuando se hace clic en un video, se redirige a la vista de reproducción de video correspondiente.

2. * Reproducción de Video:*
   - Esta vista se reproduce el video seleccionado anteriormente.
   - Utiliza un iframe incrustado de YouTube, que se le pasa un link con el ID del video seleccionado y trae el video para mostrarlo.
   - Se listan otros videos del canal en la parte derecha.
   - El ID se almacena en el localStorage al dar click, y se usa para despues buscar el id del video y mostrarlo.

3. *Vista Canal:*
   - Vista donde se muestra la información y tambien la imagen de fondo del canal.
   - Se puede acceder a esta vista dando click al icono de usuario del navbar o al dar click a la imagen o nombre del canal.



## Configuración

1. npm install

2. Abre el archivo `index.html` en tu navegador web para acceder a la vista principal.

