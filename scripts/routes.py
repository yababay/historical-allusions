import os
import subprocess

from aiohttp.web import RouteTableDef, Response

routes = RouteTableDef()

@routes.get('/edit/{dir}')
async def _edit(request):
    dir = request.match_info['dir']
    prefix = f'{os.getcwd()}/public/articles'
    if dir != 'toc':
        prefix += f'/{dir}'
    path = f'{prefix}/README.md'
    subprocess.run(["/bin/bash", "-c", f'/usr/bin/abricotine "{path}"'])
    return Response(text='ok', content_type='text/plain')

