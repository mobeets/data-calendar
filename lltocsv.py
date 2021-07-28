import re
import sys
from dateutil import parser
from datetime import datetime, timedelta

def main(infile, outfile, regexp):
	"""
	counts the number of lines, per date, matching the provided regexp
		and outputs the result as a .csv

	- infile (str): lifelog.txt
	- outfile (str): csv output file
	- regexp (str): a reg exp applied to individual lifelog items
	"""
	p = re.compile(regexp)

	with open(infile) as f:
		lines = f.readlines()
	started = False
	dt = None
	last_dt = None
	count = 0
	data = []
	for line in lines:
		if line.startswith('+++++'):
			started = True
			continue
		if not started:
			continue
		if not line.startswith('    ') and line.strip().endswith(':'):
			if dt is not None:
				last_dt = dt
				data.append((dt, count))
			dt = line.strip().replace(':','')
			if last_dt is not None:
				dt1 = parser.parse(last_dt)
				dt0 = parser.parse(dt)
				# fill any gaps in dates with with zeros
				for d in range(1, (dt1-dt0).days):
					cdt = dt0 + timedelta(d)
					data.append((cdt.strftime('%m/%d/%Y'), 0))
			count = 0
		else:
			matches = p.match(line.strip())
			if matches is not None:
				count += 1
	if count > 0:
		data.append((dt, count))
	if data:
		data = data[::-1] # sort by date
		first_nonzero = next(i for i,(x,y) in enumerate(data) if y > 0)
		data = data[first_nonzero:] # trim leading rows with zero counts
		with open(outfile, 'w') as g:
			g.write('\n'.join([x + ',' + str(y) for x,y in data]))

if __name__ == '__main__':
	main(sys.argv[1], sys.argv[2], sys.argv[3])
