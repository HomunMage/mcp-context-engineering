import asyncio
import json
import subprocess

async def main():
    # Start the MCP server
    process = await asyncio.create_subprocess_exec(
        "uv", "run", "server.py",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    
    # Send initialization request
    init_req = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {
                "name": "test-client",
                "version": "1.0.0"
            }
        }
    }
    
    process.stdin.write((json.dumps(init_req) + "\n").encode())
    await process.stdin.drain()
    
    # Read response
    response = await process.stdout.readline()
    print("Init response:", response.decode())
    
    # Call tool
    tool_req = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/call",
        "params": {
            "name": "sum",
            "arguments": {"a": 3, "b": 7}
        }
    }
    
    process.stdin.write((json.dumps(tool_req) + "\n").encode())
    await process.stdin.drain()
    
    response = await process.stdout.readline()
    print("Tool response:", response.decode())
    
    process.terminate()
    await process.wait()

asyncio.run(main())