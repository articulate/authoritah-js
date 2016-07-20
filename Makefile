VERSION:=$(shell ./bin/authoritah --version)

.PHONY: build watch test clean

build:
	npm run build

test:
	npm run test

watch:
	npm run watch

clean:
	npm run clean
	make build

container:
	docker build .

release:
	git push origin master
	git tag $(VERSION)
	git push origin tag $(VERSION)
