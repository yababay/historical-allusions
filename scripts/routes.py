import os
import subprocess

from aiohttp.web import RouteTableDef, Response

routes = RouteTableDef()

@routes.get('/edit/{dir}')
async def _edit(request):
    dir = request.match_info['dir']
    path = f'{os.getcwd()}/public/articles/{dir}/README.md'
    subprocess.run(["/bin/bash", "-c", f'/usr/bin/abricotine "{path}"'])
    return Response(text='ok', content_type='text/plain')

