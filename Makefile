.PHONY: build watch test clean

build:
	npm run build

test:
	npm run test

watch:
	npm run watch

clean:
	npm run clean

release:
	VERSION:= $(shell ./bin/authoritah --version)

	git push origin master
	git tag $(VERSION)
	git push origin tag $(VERSION)
