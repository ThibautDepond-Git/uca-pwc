#!/usr/bin/env bash
r="meowmeow@192.168.1.76"
s="ssh $r"
$s 'rm -rf www/*'
tar czf - build | $s 'tar xzf -'
$s 'mv build/* www/'
$s 'rmdir build'
